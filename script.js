// frontend/script.js
document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const query = document.getElementById('searchQuery').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    try {
        const response = await fetch('http://localhost:3000/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        const videos = await response.json();
        videos.forEach(video => {
            const videoDiv = document.createElement('div');
            videoDiv.className = 'result';
            videoDiv.innerHTML = `
                <h3>${video.title}</h3>
                <img src="${video.thumbnail}" alt="${video.title}">
                <p>Views: ${video.views}</p>
                <p><a href="${video.link}" target="_blank">Watch on YouTube</a></p>
            `;
            resultsDiv.appendChild(videoDiv);
        });
    } catch (error) {
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
