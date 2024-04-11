const handleAddNewGarden = async () => {
  const formData = new FormData();
  formData.append("Address", newAddress);
  formData.append("Square", newSquare);
  imageGarden.map((image) => {
    formData.append(`Image`, image.file);
  });
  // setLoading(true);
  try {
    await addCustomerGarden(formData);
    fetchCustomerGarden();
    setLoading(false);
    toast.success("Thêm vườn thành công thành Công");
  } catch (error) {
    toast.error("Update không thành công", error);
  }
};
