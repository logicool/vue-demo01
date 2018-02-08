export const userInfo = state => state.login;

export const userRoles = state => {
    return state.login.roles
      ? state.login.roles[0]
      : -1
  };