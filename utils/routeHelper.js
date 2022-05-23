// Expects ids as an array of integers
function dishIds(ids) {
  let dishIds = [];
  ids.forEach(id => {
    dishIds.push({id: id})
  });

  return dishIds;
};

module.exports = dishIds;