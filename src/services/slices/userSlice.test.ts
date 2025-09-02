import { expect, test } from '@jest/globals';
import userSlice, {
  authChecked,
  loginUser,
  registerUser,
  logoutUser,
  userApi,
  updateUser,
  TUserState
} from './userSlice';
import { TLoginData, TRegisterData } from '@api';

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

const testUser = {
  success: true,
  user: {
    email: 'test@ya.ru',
    name: 'test'
  },
  accessToken: 'test',
  refreshToken: 'test'
};

const mockUserLogin: TLoginData = {
  email: 'test@ya.ru',
  password: '123456'
};

const mockRegData: TRegisterData = {
  email: 'testreg@ya.ru',
  name: 'test',
  password: '123456'
};

const mockUserDataUpdate = {
  name: 'updateTestName',
  password: '654321'
};

describe('user slice tests', () => {
  test('auth checked test', () => {
    const prevState = {
      ...initialState,
      isAuthChecked: false
    };
    const newState = userSlice(prevState, authChecked());
    const expectedState = {
      ...initialState,
      isAuthChecked: true
    };
    expect(newState).toEqual(expectedState);
  });

  test('login pending', () => {
    const newState = userSlice(
      {
        ...initialState,
        loginUserError: 'test error'
      },
      loginUser.pending('', mockUserLogin)
    );
    expect(newState.loginUserRequest).toBe(true);
    expect(newState.loginUserError).toBeNull();
  });

  test('login user fulfilled', () => {
    const newState = userSlice(
      {
        ...initialState
      },
      loginUser.fulfilled(testUser.user, '', mockUserLogin)
    );
    expect(newState).toEqual({
      isAuthChecked: true,
      isAuthenticated: true,
      user: testUser.user,
      loginUserError: null,
      loginUserRequest: false
    });
  });

  test('login user rejected', () => {
    const testErr = new Error('login test error');
    const newState = userSlice(
      {
        ...initialState
      },
      loginUser.rejected(testErr, '', mockUserLogin)
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserError: testErr.message
    });
  });

  test('register user pending', () => {
    const newState = userSlice(
      {
        ...initialState,
        loginUserError: 'test error'
      },
      registerUser.pending('', mockRegData)
    );
    expect(newState).toEqual({
      ...initialState,
      loginUserError: null,
      loginUserRequest: true
    });
  });

  test('register user fulfilled', () => {
    const newState = userSlice(
      {
        ...initialState
      },
      registerUser.fulfilled(testUser.user, '', mockRegData)
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: testUser.user,
      loginUserRequest: false
    });
  });

  test('register user rejected', () => {
    const testErr = new Error('reg test error');
    const newState = userSlice(
      {
        ...initialState
      },
      registerUser.rejected(testErr, '', mockRegData)
    );
    expect(newState).toEqual({
      ...initialState,
      loginUserError: testErr.message,
      isAuthenticated: false,
      loginUserRequest: false
    });
  });

  test('logout user pending', () => {
    const newState = userSlice(
      {
        ...initialState,
        isAuthenticated: true,
        user: testUser.user,
        loginUserRequest: false
      },
      logoutUser.pending('')
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: testUser.user,
      loginUserRequest: true
    });
  });

  test('logout user fulfilled', () => {
    const newState = userSlice(
      {
        ...initialState,
        isAuthenticated: true,
        user: testUser.user,
        loginUserRequest: true
      },
      logoutUser.fulfilled(null, '')
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthenticated: false,
      user: null,
      loginUserRequest: false
    });
  });

  test('logout user rejected', () => {
    const testErr = new Error('logout test error');
    const newState = userSlice(
      {
        ...initialState,
        isAuthenticated: true,
        user: testUser.user,
        loginUserRequest: true
      },
      logoutUser.rejected(testErr, '')
    );
    expect(newState).toEqual({
      ...initialState,
      loginUserError: testErr.message,
      loginUserRequest: false,
      isAuthenticated: false,
      user: testUser.user
    });
  });

  test('get user api pending', () => {
    const newState = userSlice(
      {
        ...initialState,
        loginUserError: 'previous error',
        isAuthenticated: true,
        user: testUser.user
      },
      userApi.pending('')
    );
    expect(newState).toEqual({
      ...initialState,
      loginUserError: null,
      loginUserRequest: true,
      isAuthenticated: false,
      user: null
    });
  });

  test('get user api fulfilled', () => {
    const newState = userSlice(
      {
        ...initialState,
        loginUserRequest: true
      },
      userApi.fulfilled(testUser, '')
    );
    expect(newState).toEqual({
      ...initialState,
      user: testUser.user,
      loginUserRequest: false,
      isAuthenticated: true,
      loginUserError: null,
      isAuthChecked: true
    });
  });

  test('get user api rejected', () => {
    const testErr = new Error('get user test error');
    const newState = userSlice(
      {
        ...initialState,
        loginUserRequest: true
      },
      userApi.rejected(testErr, '')
    );
    expect(newState).toEqual({
      ...initialState,
      loginUserRequest: false,
      isAuthChecked: true,
      user: null,
      isAuthenticated: false,
      loginUserError: testErr.message
    });
  });

  test('update user pending', () => {
    const newState = userSlice(
      {
        ...initialState,
        isAuthenticated: true,
        user: testUser.user,
        loginUserRequest: false
      },
      updateUser.pending('', mockUserDataUpdate)
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: testUser.user,
      loginUserRequest: true
    });
  });

  test('update user fulfilled', () => {
    const updatedUser = { ...testUser.user, name: 'updatedName' };
    const newState = userSlice(
      {
        ...initialState,
        isAuthenticated: true,
        user: testUser.user,
        loginUserRequest: true
      },
      updateUser.fulfilled(
        {
          user: updatedUser,
          success: true
        },
        '',
        mockUserDataUpdate
      )
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: updatedUser,
      loginUserRequest: false
    });
  });

  test('update user rejected', () => {
    const testErr = new Error('update user test error');
    const newState = userSlice(
      {
        ...initialState,
        isAuthenticated: true,
        user: testUser.user,
        loginUserRequest: true
      },
      updateUser.rejected(testErr, '', mockUserDataUpdate)
    );
    expect(newState).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: testUser.user,
      loginUserRequest: false,
      loginUserError: testErr.message
    });
  });
});
