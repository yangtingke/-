module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { messages, systemPrompt } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const payload = {
    model: 'qwen-plus',
    messages: [
      {
        role: 'system',
        content: systemPrompt || '你是一位专注于中国古代建筑知识的讲解员。只回答与中国古代建筑相关的问题。对于其他话题，请礼貌引导用户回到古建筑主题。回答简洁专业，中文，150字以内。'
      },
      ...messages
    ],
    max_tokens: 350
  };

  try {
    const response = await fetch(
      'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || '暂时无法回答，请稍后再试。';
    return res.status(200).json({ answer });
  } catch (err) {
    return res.status(500).json({ error: '网络错误，请稍后重试。' });
  }
};