import { test, expect } from '@playwright/test';

const GRAPHQL_URL = 'https://api.mydaytrip.com/graphql';

const HEADERS = {
  'Content-Type': 'application/json',
  'Lang': 'en',
  'X-Daytrip-Client': 'website prd-7fba4fa5',
  'X-Daytrip-Session-Unique-Id': 'playwright-test-session-001',
};

test.describe('API: GraphQL — FindLocationsBySearchStringV3', () => {

  test('TC-API-AUTO-001: Valid city search returns results', async ({ request }) => {
    const response = await request.post(GRAPHQL_URL, {
      headers: HEADERS,
      data: {
        operationName: 'FindLocationsBySearchStringV3',
        query: `query FindLocationsBySearchStringV3($searchString: String!) {
          findLocationsBySearchStringV3(searchString: $searchString) {
            _id
            mainText
            secondaryText
            locationType
          }
        }`,
        variables: { searchString: 'Prague' }
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.findLocationsBySearchStringV3).toBeDefined();
    expect(body.data.findLocationsBySearchStringV3.length).toBeGreaterThan(0);
    expect(body.data.findLocationsBySearchStringV3[0].mainText).toContain('Prague');
  });

  test('TC-API-AUTO-002: XSS payload in search string is handled safely', async ({ request }) => {
    const response = await request.post(GRAPHQL_URL, {
      headers: HEADERS,
      data: {
        operationName: 'FindLocationsBySearchStringV3',
        query: `query FindLocationsBySearchStringV3($searchString: String!) {
          findLocationsBySearchStringV3(searchString: $searchString) {
            _id
            mainText
          }
        }`,
        variables: { searchString: "<script>alert('xss')</script>" }
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    // No errors field — XSS payload handled safely
    expect(body.errors).toBeUndefined();
  });

});