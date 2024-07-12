import Course from "../../models/courseModel.js";

export const manageCourses = async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

    try {
        const query = search
            ? { title: new RegExp(search, 'i') } // Search by course title
            : {};

        const courses = await Course.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export default manageCourses;
