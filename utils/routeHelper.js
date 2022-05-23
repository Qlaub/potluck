function dishIds(ids) {
  let dishIds = [];
  ids.forEach(id => {
    dishIds.push({id: id})
  });

  return dishIds;
};

module.exports = dishIds;