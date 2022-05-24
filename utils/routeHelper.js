// Expects ids as an array of integers
// Returns array of objects, each has an id key associated with a dish
function dishIds(ids) {
  let dishIds = [];
  ids.forEach(id => {
    dishIds.push({id: id})
  });

  return dishIds;
};

module.exports = dishIds;