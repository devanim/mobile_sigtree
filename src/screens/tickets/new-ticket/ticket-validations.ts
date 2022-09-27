const ticketValidations = {
  name: {required: {value: true, message: 'Name is required'}},
  email: {
    required: {value: true, message: 'Email is required'},
  },
  password: {
    required: {value: true, message: 'Password is required'},
  },
};

export default ticketValidations;