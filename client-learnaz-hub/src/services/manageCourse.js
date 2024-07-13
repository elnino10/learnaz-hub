import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace with your backend URL

export const fetchCourses = async ({ search = '', page = 1, limit = 10 }) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/manageCourses`, {
            params: { search, page, limit }
        });
        return response.data.courses;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export default fetchCourses;
