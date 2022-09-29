const ticketValidations = {
  title: {required: { value: true, message: "Title is required" }},
  description: {required: { value: true, message: "Description is required" }},
  priority: {required: { value: true, message: "Priority is required" }},
  floor: {required: { value: true, message: "Floor is required" }},
  category: {required: { value: true, message: "Category is required" }},
};

export default ticketValidations;