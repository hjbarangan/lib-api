const validateUser = async (user) => {
  const { first_name, last_name, username, password, role } = user;

  if (!first_name) {
    throw new Error("Missing required field: First Name");
  }

  if (!last_name) {
    throw new Error("Missing required field: Last Name");
  }

  if (!username) {
    throw new Error("Missing required field: Username");
  }

  if (!password) {
    throw new Error("Missing required field: Password");
  }

  if (!role) {
    throw new Error("Missing required field: Role");
  }
};

module.exports = validateUser;
