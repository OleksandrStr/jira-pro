import {JiraState, ProjectType} from "@/types";
import {configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {jiraService} from "services/jira";

export const fetchUserData = createAsyncThunk(
    'jira/fetchUserData',
    async ({userId, project}: {userId: string, project: ProjectType}) => {
        const data = await jiraService.getUserData(userId, project);
        return { userId, project, data };
    }
);

const initialState: JiraState = {
    users: {},
    loading: {},
    error: null,
};

const jiraSlice = createSlice({
    name: 'jira',
    initialState,
    reducers: {
        clearUserData: (state) => {
            state.users = {};
            state.loading = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state, action) => {
                const {userId} = action.meta.arg;
                state.loading[userId] = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                const { userId, data } = action.payload;
                state.users[userId] = data;
                state.loading[userId] = false;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                const {userId} = action.meta.arg;
                state.loading[userId] = false;
                state.error = action.error.message || 'Failed to fetch data';
            });
    },
});

export const { clearUserData } = jiraSlice.actions;

export const store = configureStore({
    reducer: {
        jira: jiraSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
