import Course from "../../models/courseModel.js";

// View course details
export const getCourseDetails = async (courseId) => {
    try {
        const course = await Course.findById(courseId).populate('instructorId');
        if (!course) {
            throw new Error("Course not found");
        }
        return course;
    } catch (error) {
        throw error;
    }
};

// Submit an assignment
export const submitAssignment = async (studentId, courseId, assignmentId, submission) => {
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }

        const assignment = course.assignments.id(assignmentId);
        if (!assignment) {
            throw new Error("Assignment not found");
        }

        assignment.submissions.push({ studentId, submission });
        await course.save();

        return { message: "Assignment submitted successfully" };
    } catch (error) {
        throw error;
    }
};
