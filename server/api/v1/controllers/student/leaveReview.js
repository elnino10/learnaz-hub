import Course from "../../models/courseModel.js";

// Leave a course review
export const leaveReview = async (req, res) => {
    try {
        const { courseId, review, rating } = req.body;
        const course = await Course.findById(courseId);
        if (!course) {
        return res.status(404).json({ message: "Course not found" });
        }

        course.review.push({ studentId: req.user.id, review, rating });
        await course.save();

        res.status(200).json({ message: "Review submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
