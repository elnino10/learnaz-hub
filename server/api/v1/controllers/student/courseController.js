//Student courseController
import Course from "../../models/courseModel.js";

// View course details
export const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate('instructorId');
        if (!course) {
        return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit an assignment
export const submitAssignment = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { courseId, assignmentId } = req.params;
        const { submission } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
        return res.status(404).json({ message: "Course not found" });
        }

        const assignment = course.assignments.id(assignmentId);
        if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
        }

        assignment.submissions.push({
        studentId,
        submission,
        });

        await course.save();

        res.status(200).json({ message: "Assignment submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
