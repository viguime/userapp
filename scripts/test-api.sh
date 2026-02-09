#!/bin/bash

echo "🧪 Testing User API Endpoints"
echo "================================"
echo ""

BASE_URL="http://localhost:3000"

# Test 1: Get all users (default pagination)
echo "1️⃣  GET /api/users (first page, 10 users)"
curl -s "$BASE_URL/api/users" | jq '{success, pagination, user_count: (.data | length), first_user: .data[0].email}'
echo ""

# Test 2: Get page 2
echo "2️⃣  GET /api/users?page=2 (second page)"
curl -s "$BASE_URL/api/users?page=2" | jq '{success, pagination, user_count: (.data | length)}'
echo ""

# Test 3: Filter by active=true
echo "3️⃣  GET /api/users?active=true (active users only)"
curl -s "$BASE_URL/api/users?active=true&limit=50" | jq '{success, total: .pagination.total, active_users: (.data | length)}'
echo ""

# Test 4: Filter by active=false
echo "4️⃣  GET /api/users?active=false (inactive users only)"
curl -s "$BASE_URL/api/users?active=false&limit=50" | jq '{success, total: .pagination.total, inactive_users: (.data | length)}'
echo ""

# Test 5: Search by name
echo "5️⃣  GET /api/users?search=smith (search for 'smith')"
curl -s "$BASE_URL/api/users?search=smith" | jq '{success, total: .pagination.total, users: [.data[].email]}'
echo ""

# Test 6: Filter by skill
echo "6️⃣  GET /api/users?skill=React (users with React as main skill)"
curl -s "$BASE_URL/api/users?skill=React&limit=50" | jq '{success, total: .pagination.total, users: [.data[] | {name: (.first_name + " " + .last_name), skill: .main_skill}]}'
echo ""

# Test 7: Combined filters
echo "7️⃣  GET /api/users?active=true&search=s (active users with 's' in name)"
curl -s "$BASE_URL/api/users?active=true&search=s&limit=50" | jq '{success, total: .pagination.total, count: (.data | length)}'
echo ""

# Test 8: Get single user by ID
echo "8️⃣  GET /api/users/1 (get user with ID 1)"
curl -s "$BASE_URL/api/users/1" | jq '{success, user: {id: .data.id, name: (.data.first_name + " " + .data.last_name), email: .data.email, active: .data.active}}'
echo ""

# Test 9: Get non-existent user
echo "9️⃣  GET /api/users/999 (non-existent user - should return 404)"
curl -s -w "\nHTTP Status: %{http_code}\n" "$BASE_URL/api/users/999" | head -1 | jq '{success, error}'
echo ""

# Test 10: Invalid ID
echo "🔟 GET /api/users/invalid (invalid ID - should return 400)"
curl -s -w "\nHTTP Status: %{http_code}\n" "$BASE_URL/api/users/invalid" | head -1 | jq '{success, error}'
echo ""

echo "================================"
echo "✅ API Tests Complete!"
