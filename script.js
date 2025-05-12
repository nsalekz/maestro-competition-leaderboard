document.addEventListener('DOMContentLoaded', function() {
    // Mock data for the leaderboard
    const mockData = [
        { rank: 1, address: '0x1234567890abcdef1234567890abcdef12345678', volume: 25890 },
        { rank: 2, address: '0xabcdef1234567890abcdef1234567890abcdef12', volume: 24560 },
        { rank: 3, address: '0x7890abcdef1234567890abcdef1234567890abcd', volume: 23450 },
        { rank: 4, address: '0x567890abcdef1234567890abcdef1234567890ab', volume: 21780 },
        { rank: 5, address: '0x90abcdef1234567890abcdef1234567890abcdef', volume: 19870 },
        { rank: 6, address: '0xef1234567890abcdef1234567890abcdef123456', volume: 18940 },
        { rank: 7, address: '0xdef1234567890abcdef1234567890abcdef12345', volume: 17650 },
        { rank: 8, address: '0xcdef1234567890abcdef1234567890abcdef1234', volume: 16780 },
        { rank: 9, address: '0xbcdef1234567890abcdef1234567890abcdef123', volume: 15320 },
        { rank: 10, address: '0xabcdef1234567890abcdef1234567890abcdef12', volume: 14560 },
        { rank: 11, address: '0x1145678901abcdef2345678901abcdef23456781', volume: 13763 },
        { rank: 12, address: '0x1245678901abcdef2345678901abcdef23456782', volume: 13491 },
        { rank: 13, address: '0x1345678901abcdef2345678901abcdef23456783', volume: 13045 },
        { rank: 14, address: '0x1445678901abcdef2345678901abcdef23456784', volume: 12739 },
        { rank: 15, address: '0x1545678901abcdef2345678901abcdef23456785', volume: 12436 },
        { rank: 16, address: '0x1645678901abcdef2345678901abcdef23456786', volume: 12039 },
        { rank: 17, address: '0x1745678901abcdef2345678901abcdef23456787', volume: 11672 },
        { rank: 18, address: '0x1845678901abcdef2345678901abcdef23456788', volume: 11261 },
        { rank: 19, address: '0x1945678901abcdef2345678901abcdef23456789', volume: 10906 },
        { rank: 20, address: '0x2045678901abcdef2345678901abcdef23456820', volume: 10607 },
        { rank: 21, address: '0x2145678901abcdef2345678901abcdef23456821', volume: 10268 },
        { rank: 22, address: '0x2245678901abcdef2345678901abcdef23456822', volume: 9894 },
        { rank: 23, address: '0x2345678901abcdef2345678901abcdef23456823', volume: 9482 },
        { rank: 24, address: '0x2445678901abcdef2345678901abcdef23456824', volume: 9240 },
        { rank: 25, address: '0x2545678901abcdef2345678901abcdef23456825', volume: 8859 },
        { rank: 26, address: '0x2645678902abcdef3456789012abcdef34567826', volume: 8645 },
        { rank: 27, address: '0x2745678903abcdef3456789013abcdef34567827', volume: 8437 },
        { rank: 28, address: '0x2845678904abcdef3456789014abcdef34567828', volume: 8123 },
        { rank: 29, address: '0x2945678905abcdef3456789015abcdef34567829', volume: 7925 },
        { rank: 30, address: '0x3045678906abcdef3456789016abcdef34567830', volume: 7651 },
        { rank: 31, address: '0x3145678907abcdef3456789017abcdef34567831', volume: 7345 },
        { rank: 32, address: '0x3245678908abcdef3456789018abcdef34567832', volume: 7123 },
        { rank: 33, address: '0x3345678909abcdef3456789019abcdef34567833', volume: 6852 },
        { rank: 34, address: '0x3445678910abcdef3456789020abcdef34567834', volume: 6543 },
        { rank: 35, address: '0x3545678911abcdef3456789021abcdef34567835', volume: 6341 },
        { rank: 36, address: '0x3645678912abcdef3456789022abcdef34567836', volume: 6212 },
        { rank: 37, address: '0x3745678913abcdef3456789023abcdef34567837', volume: 6050 },
        { rank: 38, address: '0x3845678914abcdef3456789024abcdef34567838', volume: 5878 },
        { rank: 39, address: '0x3945678915abcdef3456789025abcdef34567839', volume: 5654 },
        { rank: 40, address: '0x4045678916abcdef3456789026abcdef34567840', volume: 5456 },
        { rank: 41, address: '0x4145678917abcdef3456789027abcdef34567841', volume: 5267 },
        { rank: 42, address: '0x4245678918abcdef3456789028abcdef34567842', volume: 5134 },
        { rank: 43, address: '0x4345678919abcdef3456789029abcdef34567843', volume: 4980 },
        { rank: 44, address: '0x4445678920abcdef3456789030abcdef34567844', volume: 4823 },
        { rank: 45, address: '0x4545678921abcdef3456789031abcdef34567845', volume: 4654 },
        { rank: 46, address: '0x4645678922abcdef3456789032abcdef34567846', volume: 4532 },
        { rank: 47, address: '0x4745678923abcdef3456789033abcdef34567847', volume: 4398 },
        { rank: 48, address: '0x4845678924abcdef3456789034abcdef34567848', volume: 4287 },
        { rank: 49, address: '0x4945678925abcdef3456789035abcdef34567849', volume: 4167 },
        { rank: 50, address: '0x5045678926abcdef3456789036abcdef34567850', volume: 4022 }
    ];

    // Function to format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Function to create a row for the leaderboard
    function createLeaderboardRow(data) {
        const row = document.createElement('div');
        row.className = `leaderboard-row rank-${data.rank}`;
        
        const rankCell = document.createElement('div');
        rankCell.className = 'rank';
        rankCell.textContent = data.rank;
        
        const addressCell = document.createElement('div');
        addressCell.className = 'address';
        const addressLink = document.createElement('a');
        addressLink.href = `https://bscscan.com/address/${data.address}`;
        addressLink.target = '_blank';
        addressLink.rel = 'noopener noreferrer';
        addressLink.textContent = data.address;
        addressCell.appendChild(addressLink);
        
        const scoreCell = document.createElement('div');
        scoreCell.className = 'score';
        scoreCell.textContent = `$${formatNumber(data.volume)}`;
        
        row.appendChild(rankCell);
        row.appendChild(addressCell);
        row.appendChild(scoreCell);
        
        return row;
    }

    // Remove loading message
    const leaderboardData = document.getElementById('leaderboard-data');
    leaderboardData.innerHTML = '';

    // Create visible entries container (for ranks 1-25)
    const visibleEntries = document.createElement('div');
    visibleEntries.className = 'visible-entries';
    
    // Create hidden entries container (for ranks 26-50)
    const hiddenEntries = document.createElement('div');
    hiddenEntries.className = 'hidden-entries';
    hiddenEntries.style.display = 'none';
    
    // Populate the leaderboard
    mockData.forEach((entry, index) => {
        if (index < 25) {
            visibleEntries.appendChild(createLeaderboardRow(entry));
        } else {
            hiddenEntries.appendChild(createLeaderboardRow(entry));
        }
    });
    
    // Add both containers to the leaderboard
    leaderboardData.appendChild(visibleEntries);
    leaderboardData.appendChild(hiddenEntries);
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle-button';
    toggleButton.textContent = 'Show More (26-50)';
    toggleButton.addEventListener('click', function() {
        if (hiddenEntries.style.display === 'none') {
            hiddenEntries.style.display = 'block';
            toggleButton.textContent = 'Show Less';
        } else {
            hiddenEntries.style.display = 'none';
            toggleButton.textContent = 'Show More (26-50)';
            // Scroll back to visible entries if needed
            visibleEntries.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Add toggle button to the leaderboard
    leaderboardData.appendChild(toggleButton);
});
