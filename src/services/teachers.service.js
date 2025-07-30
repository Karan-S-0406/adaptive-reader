import axios from "axios";

class TeachersService {
  constructor() {
    this.reqUrl = import.meta.env.VITE_API_BASE_URL;
  }

  async fetchStudentsByGrades(data) {
    try {
      const reqBody = {
        grades: data,
      };
      const response = await axios.post(
        `${this.reqUrl}students/by-grades`,
        reqBody
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async uploadAssignment(data) {
    try {
      const assignmentType = data.type;

      // Decide endpoint based on type
      const endpoint =
        assignmentType === "reading"
          ? `${this.reqUrl}teachers/uploadAssignmentReading`
          : `${this.reqUrl}teachers/uploadAssignment`;

      console.log(`Uploading ${assignmentType} assignment to:`, endpoint, data);

      const response = await axios.post(endpoint, data);

      return response.data;
    } catch (error) {
      console.error("Upload error:", error);
      return error;
    }
  }
}

export default new TeachersService();
