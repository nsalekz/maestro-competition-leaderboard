document.addEventListener('DOMContentLoaded', () => {
    // Leaderboard data container
    const leaderboardContainer = document.getElementById('leaderboard-data');
    
    // Load and display leaderboard data initially
    loadLeaderboardData();
    
    // Set up auto-refresh every 60 seconds (adjust the interval as needed)
    const REFRESH_INTERVAL = 60000; // 60 seconds in milliseconds
    setInterval(() => {
        // Only update the data, not the entire page
        loadLeaderboardData(true); // Pass true to indicate this is an auto-refresh
        console.log('Leaderboard data refreshed at', new Date().toLocaleTimeString());
    }, REFRESH_INTERVAL);
    
    /**
     * Fetch leaderboard data from API
     * Replace the mockData with your actual API call when ready
     * @param {boolean} isAutoRefresh - Whether this load is from auto-refresh (default: false)
     */
    async function loadLeaderboardData(isAutoRefresh = false) {
        try {
            // Only show loading state on initial load, not during auto-refresh
            if (!isAutoRefresh) {
                leaderboardContainer.innerHTML = '<div class="loading-message">Loading leaderboard data...</div>';
            }
            
            // Store current display state of "Show More" before refresh
            let hiddenEntriesVisible = false;
            const hiddenEntries = document.querySelector('.hidden-entries');
            if (hiddenEntries && hiddenEntries.style.display !== 'none') {
                hiddenEntriesVisible = true;
            }
            
            // Simulate API call delay (remove this in production)
            // In production with a real API, you wouldn't need this delay
            await new Promise(resolve => setTimeout(resolve, isAutoRefresh ? 300 : 1000));
            
            // REPLACE THIS: Use your actual API endpoint when ready
            // const response = await fetch('https://your-api-endpoint.com/leaderboard');
            // const data = await response.json();
            
            // Using mock data for now (replace with actual API call later)
            // In production, this would be replaced with real API data
            const data = getMockData();
            
            // Render the leaderboard with the data and preserve "Show More" state
            renderLeaderboard(data, hiddenEntriesVisible);
            
            // Subtle visual indication that data was updated (only for auto-refresh)
            if (isAutoRefresh) {
                const rows = document.querySelectorAll('.leaderboard-row');
                rows.forEach(row => {
                    row.classList.add('data-updated');
                    // Remove the class after animation completes
                    setTimeout(() => {
                        row.classList.remove('data-updated');
                    }, 1000);
                });
            }
        } catch (error) {
            console.error('Error loading leaderboard data:', error);
            if (!isAutoRefresh) {
                // Only show error on initial load, not during auto-refresh
                leaderboardContainer.innerHTML = '<div class="loading-message">Failed to load leaderboard data. Please try again later.</div>';
            }
        }
    }
    
    /**
     * Renders the leaderboard with the provided data
     * @param {Array} data - Array of competitors with address and score
     * @param {boolean} keepHiddenVisible - Whether to keep hidden entries visible (for refreshes)
     */
    function renderLeaderboard(data, keepHiddenVisible = false) {
        // Clear loading message
        leaderboardContainer.innerHTML = '';
        
        // Sort data by score (highest first)
        const sortedData = [...data].sort((a, b) => b.score - a.score);
        
        // Create container for visible entries (top 25 by default)
        const visibleContainer = document.createElement('div');
        visibleContainer.className = 'visible-entries';
        
        // Create container for hidden entries (26-50)
        const hiddenContainer = document.createElement('div');
        hiddenContainer.className = 'hidden-entries';
        hiddenContainer.style.display = keepHiddenVisible ? 'block' : 'none';
        
        // Generate and append rows
        sortedData.forEach((item, index) => {
            const rank = index + 1;
            const row = createLeaderboardRow(rank, item.address, item.score);
            
            if (rank <= 25) {
                visibleContainer.appendChild(row);
            } else {
                hiddenContainer.appendChild(row);
            }
        });
        
        // Add both containers to the leaderboard
        leaderboardContainer.appendChild(visibleContainer);
        leaderboardContainer.appendChild(hiddenContainer);
        
        // Add "Show More"/"Show Less" toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'toggle-button';
        toggleButton.textContent = keepHiddenVisible ? 'Show Less (Top 25)' : 'Show More (26-50)';
        toggleButton.addEventListener('click', () => {
            const isHidden = hiddenContainer.style.display === 'none';
            hiddenContainer.style.display = isHidden ? 'block' : 'none';
            toggleButton.textContent = isHidden ? 'Show Less (Top 25)' : 'Show More (26-50)';
        });
        
        leaderboardContainer.appendChild(toggleButton);
    }
    
    /**
     * Creates a leaderboard row element
     * @param {number} rank - Competitor's rank
     * @param {string} address - Competitor's address
     * @param {number} score - Competitor's score
     * @returns {HTMLElement} The created row element
     */
    function createLeaderboardRow(rank, address, score) {
        const row = document.createElement('div');
        row.className = `leaderboard-row${rank <= 3 ? ' rank-' + rank : ''}`;
        
        const rankElement = document.createElement('div');
        rankElement.className = 'rank';
        rankElement.textContent = rank;
        
        const addressElement = document.createElement('div');
        addressElement.className = 'address';
        
        // Create a hyperlink to BSCScan for the address
        const addressLink = document.createElement('a');
        addressLink.href = `https://bscscan.com/address/${address}`;
        addressLink.target = '_blank'; // Open in new tab
        addressLink.rel = 'noopener noreferrer'; // Security best practice
        addressLink.textContent = address;
        addressLink.title = address; // Show full address on hover
        
        addressElement.appendChild(addressLink);
        
        const scoreElement = document.createElement('div');
        scoreElement.className = 'score';
        scoreElement.textContent = formatScore(score);
        
        row.appendChild(rankElement);
        row.appendChild(addressElement);
        row.appendChild(scoreElement);
        
        return row;
    }
    
    /**
     * Format score with commas for thousands
     * @param {number} score - The score to format
     * @returns {string} Formatted score
     */
    function formatScore(score) {
        return '$' + score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    /**
     * Returns mock data for development purposes
     * REPLACE THIS with your actual API call when backend is ready
     * @returns {Array} Mock leaderboard data
     */
    function getMockData() {
        // Generate 50 mock addresses for the leaderboard
        const mockData = [];
        
        // First place entries with higher scores
        mockData.push({ address: "0x1234567890abcdef1234567890abcdef12345678", score: 25890 });
        mockData.push({ address: "0xabcdef1234567890abcdef1234567890abcdef12", score: 24560 });
        mockData.push({ address: "0x7890abcdef1234567890abcdef1234567890abcd", score: 23450 });
        mockData.push({ address: "0x567890abcdef1234567890abcdef1234567890ab", score: 21780 });
        mockData.push({ address: "0x90abcdef1234567890abcdef1234567890abcdef", score: 19870 });
        mockData.push({ address: "0xef1234567890abcdef1234567890abcdef123456", score: 18940 });
        mockData.push({ address: "0xdef1234567890abcdef1234567890abcdef12345", score: 17650 });
        mockData.push({ address: "0xcdef1234567890abcdef1234567890abcdef1234", score: 16780 });
        mockData.push({ address: "0xbcdef1234567890abcdef1234567890abcdef123", score: 15320 });
        mockData.push({ address: "0xabcdef1234567890abcdef1234567890abcdef12", score: 14560 });
        
        // Positions 11-25
        for (let i = 11; i <= 25; i++) {
            const score = Math.floor(14000 - ((i - 10) * 350) + Math.random() * 200);
            const addressNum = i.toString().padStart(2, '0');
            mockData.push({
                address: `0x${addressNum}45678901abcdef2345678901abcdef2345678${addressNum}`,
                score: score
            });
        }
        
        // Positions 26-50
        for (let i = 26; i <= 50; i++) {
            const score = Math.floor(9000 - ((i - 25) * 200) + Math.random() * 150);
            const addressNum = i.toString().padStart(2, '0');
            mockData.push({
                address: `0x${addressNum}56789012abcdef3456789012abcdef3456789${addressNum}`,
                score: score
            });
        }
        
        return mockData;
    }
    
    /**
     * API Integration Guide:
     * 
     * To connect to your actual API:
     * 1. Replace the getMockData() function call with a fetch to your API endpoint
     * 2. Update the data structure to match your API response format
     * 3. Adjust the renderLeaderboard and createLeaderboardRow functions if needed
     * 
     * Example API call:
     * 
     * async function fetchLeaderboardData() {
     *   const response = await fetch('https://your-api-endpoint.com/leaderboard');
     *   if (!response.ok) {
     *     throw new Error('Network response was not ok');
     *   }
     *   return await response.json();
     * }
     */
});