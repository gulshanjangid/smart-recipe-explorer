const assert = require('assert');

async function runTests() {
    const file = "recipe_test_result.txt";
    const baseUrl = 'http://localhost:5000/api';
    console.log('Running basic API tests...');

    try {
        // Test 1: GET /recipes
        console.log('Test 1: GET /recipes');
        const res1 = await fetch(`${baseUrl}/recipes`);
        assert.strictEqual(res1.status, 200, 'Status should be 200');
        const data1 = await res1.json();
        assert.ok(Array.isArray(data1), 'Should return an array');
        console.log('✅ GET /recipes passed');

        // Test 2: Search functionality
        console.log('Test 2: Search "Paneer"');
        const res2 = await fetch(`${baseUrl}/recipes?search=Paneer`);
        const data2 = await res2.json();
        assert.ok(data2.length > 0, 'Should find Paneer recipe');
        assert.ok(data2[0].name.includes('Paneer'), 'Name should match');
        console.log('✅ Search passed');

        // Test 3: Filter by Vegetarian
        console.log('Test 3: Filter isVegetarian=true');
        const res3 = await fetch(`${baseUrl}/recipes?isVegetarian=true`);
        const data3 = await res3.json();
        assert.ok(data3.every(r => r.isVegetarian === true), 'All should be vegetarian');
        console.log('✅ Filter passed');

        console.log('All basic tests passed!');
    } catch (err) {
        console.error('❌ Test failed:', err.message);
        if (err.cause) console.error(err.cause);
    }
}

runTests();
