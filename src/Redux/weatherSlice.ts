import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '1ccd2434e55b8bd83085c433ca66219d';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch weather'
      );
    }
  }
);
// state interface 
interface WeatherState {
  city: string;
  data: any;
  error: string;
}

const initialState: WeatherState = {
  city: '',
  data: null,
  error: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = '';
      })
      .addCase(fetchWeather.rejected, (state, action: any) => {
        state.data = null;
        state.error = `Error: ${action.payload}`;
      });
  }
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
