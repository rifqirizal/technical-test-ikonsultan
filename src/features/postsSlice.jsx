import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "@/services/postServices";

export const fetchPosts = createAsyncThunk("users/fetchers", async () => {
    const response = await postService.getPost()
    return response.data
})

export const fetchPostsdetail = createAsyncThunk("users/fetchersdetail", async ({ id }) => {
    const response = await postService.getPostDetail(id)
    return response.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        postDetail: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (res) => {
        // Get Post 
        res.addCase(fetchPosts.pending, (state) => {
            state.loading = false,
                state.error = null
        });
        res.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false,
                state.posts = action.payload
            state.error = null
        });
        res.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message
        });

        // Get Detail Post
        res.addCase(fetchPostsdetail.pending, (state) => {
            state.loading = false,
                state.error = null
        });
        res.addCase(fetchPostsdetail.fulfilled, (state, action) => {
            state.loading = false,
                state.postDetail = action.payload
            state.error = null
        });
        res.addCase(fetchPostsdetail.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message
        });

    }

})

export default postsSlice.reducer