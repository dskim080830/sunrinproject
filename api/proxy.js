// api/proxy.js
export default async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'Missing url parameter' });
    }

    try {
        // 프론트엔드에서 인코딩되어 넘어온 실제 공공 API 주소를 디코딩하여 호출
        const decodedUrl = decodeURIComponent(url);
        const apiResponse = await fetch(decodedUrl);
        const data = await apiResponse.json();
        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Proxy fetching error', details: error.message });
    }
}
