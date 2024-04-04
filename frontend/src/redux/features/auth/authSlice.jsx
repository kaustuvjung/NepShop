import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';
import { toast } from 'react-toastify';




const initialState = {
    isLoggedIn: false,
    user : null,
    users: [],
    twoFactor: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    verifiedUsers: 0,
    suspendedUsers:0,
};

// register User 
export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData);            
        } catch (error) {     
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Login User 
export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);            
        } catch (error) {     
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Logout User 
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            return await authService.logout();            
        } catch (error) {     
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// getLoginStatus
export const getLoginStatus = createAsyncThunk(
    "auth/getLoginStatus",
    async (_, thunkAPI) => {
        try {
            return await authService.getLoginStatus();            
        } catch (error) {     
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// get User
export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, thunkAPI) => {
        try {
            return await authService.getUser();            
        } catch (error) {     
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// update User
export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (userData, thunkAPI) => {
        try {
            return await authService.updateUser(userData);            
        } catch (error) {     
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Send Verification Email
export const sendVerificationEmail = createAsyncThunk(
    "auth/sendVerificationEmail",
    async(_, thunkAPI) =>{
        try {
            return await authService.sendVerificationEmail();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            
            return thunkAPI.rejectWithValue(message);
        }

    }
);

// verifyUser
export const verifyUser = createAsyncThunk(
    "auth/verifyUser",
    async(verificationToken, thunkAPI) =>{
        try {
            return await authService.verifyUser(verificationToken);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            
            return thunkAPI.rejectWithValue(message);
        }

    }
);

// Change Password
export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async(userData, thunkAPI) =>{
        try {
            return await authService.changePassword(userData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            
            return thunkAPI.rejectWithValue(message);
        }

    }
);

//forgot Password
export const forgotPassword= createAsyncThunk(
  "auth/forgotPassword",
  async(userData, thunkAPI) =>{
      try {
          return await authService.forgotPassword(userData);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          
          return thunkAPI.rejectWithValue(message);
      }

  }
);
//reset  Password
export const resetPassword= createAsyncThunk(
  "auth/resetPassword",
  async({userData, resetToken}, thunkAPI) =>{
      try {
          return await authService.resetPassword(userData, resetToken);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          
          return thunkAPI.rejectWithValue(message);
      }

  }
);

//Get Users
export const getUsers= createAsyncThunk(
  "auth/getUsers",
  async(_, thunkAPI) =>{
      try {
          return await authService.getUsers();
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          
          return thunkAPI.rejectWithValue(message);
      }

  }
);

// Delete Users
export const deleteUser= createAsyncThunk(
  "auth/deleteUser",
  async(id, thunkAPI) =>{
      try {
          return await authService.deleteUser(id);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          
          return thunkAPI.rejectWithValue(message);
      }

  }
);

// upgradeUser
export const upgradeUser= createAsyncThunk(
  "auth/upgradeUser",
  async(userData, thunkAPI) =>{
      try {
          return await authService.upgradeUser(userData);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          
          return thunkAPI.rejectWithValue(message);
      }

  }
);

// sendLoginCode
export const sendLoginCode = createAsyncThunk(
  "auth/sendLoginCode",
  async(email, thunkAPI) =>{
      try {
          return await authService.sendLoginCode(email);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          
          return thunkAPI.rejectWithValue(message);
      }

  }
);

// loginWithCode
export const loginWithCode = createAsyncThunk(
  "auth/loginWithCode",
  async({code, email}, thunkAPI) =>{
      try {
          return await authService.loginWithCode(code, email);
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          
          return thunkAPI.rejectWithValue(message);
      }

  }
);




// update User photo
export const updatePhoto = createAsyncThunk(
    "auth/updatePhoto",
    async (userData, thunkAPI) => {
        try {
            return await authService.updatePhoto(userData);            
        } catch (error) {     
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state){
        state.twoFactor = false;
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
    },
  },
  
  extraReducers: (builder) => {
    builder
    // register user
    .addCase(register.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(register.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Registration sucessful")
    })
    .addCase(register.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
    })

      // Login user
      .addCase(login.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Login sucessful");
        console.log(action.payload);
    })
    .addCase(login.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
        if(action.payload.includes("New Browser")){
            state.twoFactor = true;
          }
    })
     // Logout user
     .addCase(logout.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(logout.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        state.message = action.payload;
        toast.success(action.payload);
    })
    .addCase(logout.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
    })
    // getLoginStatus
    .addCase(getLoginStatus.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(getLoginStatus.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        console.log(action.payload);
        if (action.payload.message === "invalid signature"){
            state.isLoggedIn = false;
        }
    })
    .addCase(getLoginStatus.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
    // getUser
    .addCase(getUser.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(getUser.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
    })
    .addCase(getUser.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
    })
    // updateUser
    .addCase(updateUser.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(updateUser.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("User Updated");  
    })
    .addCase(updateUser.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
    })

     //  send Verification Email
     .addCase(sendVerificationEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.user = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // verifyUser
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
       //change Password
       .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

       // reset Password
       .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

       // getUsers
       .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

       // delete User
       .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload
        toast.success(action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // upgrade User
      .addCase(upgradeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upgradeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload
        toast.success(action.payload);
      })
      .addCase(upgradeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // sendLoginCode
      .addCase(sendLoginCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendLoginCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload
        toast.success(action.payload);
      })
      .addCase(sendLoginCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload)
      })
      // loginWithCode
      .addCase(loginWithCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.twoFactor = false;
        state.user = action.payload;
        toast.success(action.payload);
      })
      .addCase(loginWithCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

    // update User photo
    .addCase(updatePhoto.pending, (state) =>{
        state.isLoading = true;
    })
    .addCase(updatePhoto.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("User photo Updated");
        console.log(action.payload);  
    })
    .addCase(updatePhoto.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
    });
  },
});



export const {RESET_AUTH} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;