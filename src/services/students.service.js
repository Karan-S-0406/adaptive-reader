import axios from "axios";

class StudentsService {
  constructor() {
    this.reqUrl = import.meta.env.VITE_API_BASE_URL;
  }

  async fetchAssignmentsByGrade(reqBody) {
    try {
      const response = await axios.post(
        `${this.reqUrl}students/fetchAssignmentsByGrade`,
        reqBody
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async fetchPdfContent(path) {
    try {
      const response = await axios.get(
        `${this.reqUrl}pdf/extract?storagePath=${path}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async transformContent(data) {
    try {
      const response = await axios.post(
        `${this.reqUrl}content/transform`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async adaptForUSStudents(data) {
    try {
      const response = await axios.post(
        `${this.reqUrl}content/adaptForUSStudents`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async updatePageReadStatus(data) {
    try {
      const response = await axios.post(
        `${this.reqUrl}students/updatePageReadStatus`,
        data
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async generateMathMCQ({ grade, storagePath }) {
    const reqBody = { grade, storagePath };
    try {
      const response = await axios.post(
        `${this.reqUrl}content/generateMathMCQ`,
        reqBody
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getMCQExplanation(reqBody) {
    console.log("Fetching getMCQExplanation with data:", reqBody);
    try {
      const response = await axios.post(
        `${this.reqUrl}content/getMCQExplanation`,
        reqBody
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async fetchBookContent(iaIdentifier) {
    try {
      const response = await axios.get(
        `${this.reqUrl}students/fetchBookContent/${iaIdentifier}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default new StudentsService();
