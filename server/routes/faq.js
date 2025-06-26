
const express = require('express');

const router = express.Router();

// Mock FAQ data
const faqData = [
  {
    id: 1,
    category: 'shipping',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5-10 business days. Express shipping takes 2-3 business days. International shipping may take up to 14 business days depending on your location.'
  },
  {
    id: 2,
    category: 'shipping',
    question: 'Do you offer free shipping?',
    answer: 'Yes! We offer free standard shipping on orders over $100. For orders under $100, shipping costs $10.'
  },
  {
    id: 3,
    category: 'returns',
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of purchase for unused items in original packaging. Return shipping is free for defective items, otherwise customer pays return shipping.'
  },
  {
    id: 4,
    category: 'returns',
    question: 'How do I return an item?',
    answer: 'Log into your account, go to Order History, select the order, and click "Return Item". Print the prepaid return label and drop off at any authorized shipping location.'
  },
  {
    id: 5,
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely.'
  },
  {
    id: 6,
    category: 'payments',
    question: 'Is my payment information secure?',
    answer: 'Yes, we use industry-standard SSL encryption and do not store your payment information on our servers. All transactions are processed through secure payment gateways.'
  },
  {
    id: 7,
    category: 'account',
    question: 'How do I create an account?',
    answer: 'Click "Sign Up" in the top right corner, enter your email and create a password. You can also sign up during checkout for faster future purchases.'
  },
  {
    id: 8,
    category: 'account',
    question: 'I forgot my password. How do I reset it?',
    answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link.'
  },
  {
    id: 9,
    category: 'products',
    question: 'Are your products authentic?',
    answer: 'Yes, all our products are 100% authentic and sourced directly from verified suppliers and manufacturers. We guarantee the authenticity of every item we sell.'
  },
  {
    id: 10,
    category: 'products',
    question: 'Do you have a warranty on products?',
    answer: 'Warranty terms vary by product and manufacturer. Most electronics come with a 1-year manufacturer warranty. Check the product page for specific warranty information.'
  }
];

// Get all FAQs
router.get('/', (req, res) => {
  try {
    const { category } = req.query;

    let faqs = faqData;

    if (category) {
      faqs = faqs.filter(faq => faq.category === category);
    }

    // Group FAQs by category
    const categories = [...new Set(faqData.map(faq => faq.category))];
    const groupedFaqs = categories.reduce((acc, cat) => {
      acc[cat] = faqData.filter(faq => faq.category === cat);
      return acc;
    }, {});

    res.json({
      faqs: category ? faqs : faqData,
      categories,
      grouped: groupedFaqs
    });

  } catch (error) {
    console.error('FAQ fetch error:', error);
    res.status(500).json({
      error: 'FAQ Error',
      message: 'Failed to fetch FAQs'
    });
  }
});

// Get FAQ by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const faq = faqData.find(f => f.id === parseInt(id));

    if (!faq) {
      return res.status(404).json({
        error: 'FAQ Not Found',
        message: 'FAQ with specified ID does not exist'
      });
    }

    res.json({
      faq
    });

  } catch (error) {
    console.error('FAQ fetch error:', error);
    res.status(500).json({
      error: 'FAQ Error',
      message: 'Failed to fetch FAQ'
    });
  }
});

module.exports = router;
const express = require('express');

const router = express.Router();

const faqs = [
  {
    id: 1,
    category: 'shipping',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5-7 business days within the same country. International shipping can take 10-21 business days depending on the destination.'
  },
  {
    id: 2,
    category: 'shipping',
    question: 'Do you offer free shipping?',
    answer: 'Yes, we offer free standard shipping on orders over $100. Express shipping rates apply for faster delivery options.'
  },
  {
    id: 3,
    category: 'returns',
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of delivery. Items must be in original condition with tags attached. Return shipping costs may apply.'
  },
  {
    id: 4,
    category: 'returns',
    question: 'How do I return an item?',
    answer: 'Log into your account, go to order history, and select "Return Item" next to the product you want to return. Follow the instructions to print a return label.'
  },
  {
    id: 5,
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. Mobile payment options are also available.'
  },
  {
    id: 6,
    category: 'payment',
    question: 'Is my payment information secure?',
    answer: 'Yes, we use industry-standard SSL encryption and do not store your payment information on our servers. All transactions are processed through secure payment gateways.'
  },
  {
    id: 7,
    category: 'account',
    question: 'How do I create an account?',
    answer: 'Click "Sign Up" in the top right corner, enter your email and create a password. You can also sign up during checkout for faster future purchases.'
  },
  {
    id: 8,
    category: 'account',
    question: 'I forgot my password. How do I reset it?',
    answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link.'
  },
  {
    id: 9,
    category: 'products',
    question: 'Are your products authentic?',
    answer: 'Yes, all our products are 100% authentic and sourced directly from verified suppliers and manufacturers. We guarantee the authenticity of every item we sell.'
  },
  {
    id: 10,
    category: 'products',
    question: 'Do you have a warranty on products?',
    answer: 'Warranty terms vary by product and manufacturer. Most electronics come with a 1-year manufacturer warranty. Check the product page for specific warranty information.'
  }
];

// Get all FAQs
router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    
    let filteredFaqs = faqs;
    if (category) {
      filteredFaqs = faqs.filter(faq => faq.category === category);
    }
    
    res.json({
      success: true,
      data: filteredFaqs
    });
  } catch (error) {
    console.error('Get FAQs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get FAQ categories
router.get('/categories', (req, res) => {
  try {
    const categories = [...new Set(faqs.map(faq => faq.category))];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get FAQ categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
