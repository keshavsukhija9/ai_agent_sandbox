const express = require('express');
const router = express.Router();


// AI analysis endpoint
router.post('/analyze', async (req, res) => {
  try {
    const { text, type = 'sentiment' } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Text is required for analysis'
      });
    }
    
    console.log(`AI analysis request: ${type}`);
    
    let result = {};
    
    switch (type) {
      case 'sentiment':
        result = analyzeSentiment(text);
        break;
      case 'keywords':
        result = extractKeywords(text);
        break;
      case 'topics':
        result = classifyTopics(text);
        break;
      default:
        result = {
          sentiment: analyzeSentiment(text),
          keywords: extractKeywords(text),
          topics: classifyTopics(text)
        };
    }
    
    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('AI analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

function analyzeSentiment(text) {
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'positive', 'success', 'growth', 'opportunity'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'negative', 'fail', 'decline', 'risk', 'problem', 'issue'];
  
  const words = text.toLowerCase().split(/\s+/);
  const positiveCount = words.filter(word => positiveWords.includes(word)).length;
  const negativeCount = words.filter(word => negativeWords.includes(word)).length;
  
  let sentiment = 'neutral';
  let confidence = 0.6;
  
  if (positiveCount > negativeCount) {
    sentiment = 'positive';
    confidence = Math.min(0.95, 0.6 + (positiveCount * 0.1));
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative';
    confidence = Math.min(0.95, 0.6 + (negativeCount * 0.1));
  }
  
  return { 
    sentiment, 
    confidence: Math.round(confidence * 100),
    positiveWords: positiveCount,
    negativeWords: negativeCount
  };
}

function extractKeywords(text) {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const wordCount = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  return Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({ 
      word, 
      count, 
      relevance: Math.round((count / words.length) * 100) / 100
    }));
}

function classifyTopics(text) {
  const topics = {
    business: ['market', 'business', 'revenue', 'profit', 'customer', 'sales'],
    technology: ['tech', 'software', 'system', 'data', 'algorithm', 'ai'],
    finance: ['price', 'cost', 'investment', 'financial', 'money', 'budget'],
    marketing: ['brand', 'campaign', 'social', 'content', 'engagement', 'audience']
  };
  
  const textLower = text.toLowerCase();
  const scores = {};
  
  Object.keys(topics).forEach(topic => {
    scores[topic] = topics[topic].reduce((score, keyword) => {
      return score + (textLower.includes(keyword) ? 1 : 0);
    }, 0) / topics[topic].length;
  });
  
  return Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .map(([topic, score]) => ({ 
      topic, 
      confidence: Math.round(score * 100) 
    }));
}

module.exports = router;