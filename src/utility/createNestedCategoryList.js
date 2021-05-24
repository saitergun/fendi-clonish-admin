const createNestedCategoryList = (categories = [], parentId = null) => {
  let response = [...categories];

  if (!parentId) {
    response = response.filter((category) => category.parent === null);
  } else {
    response = response.filter(((category2) => {
      if (!category2.parent) {
        return false;
      }

      return category2.parent.id === parentId;
    }));
  }

  response = response.map((category3) => ({
    ...category3,
    subCategories: createNestedCategoryList(categories, category3.id),
  }));

  return response;
};

export default createNestedCategoryList;
