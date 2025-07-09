/**
 * Simulates AI/NLP to extract requested fields from full identity.
 * @param {Object} fullData - Full identity object (name, age, id, etc.)
 * @param {Array} requestedFields - List of fields needed
 * @returns {Object} - Filtered identity object
 */
function extractFields(fullData, requestedFields) {
  const extracted = {};
  requestedFields.forEach(field => {
    if (fullData[field] !== undefined) {
      extracted[field] = fullData[field];
    }
  });
  return extracted;
}

module.exports = { extractFields };
