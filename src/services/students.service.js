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

  async getMathExplanation(reqBody) {
    try {
      const response = await axios.post(
        `${this.reqUrl}content/getMathExplanation`,
        reqBody
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  
  async getSignedImageUrl(reqBody) {
    console.log("Fetching signed image URL with data:", reqBody);
    try {
      const response = await axios.post(
        `${this.reqUrl}content/getSignedImageUrl`,
        reqBody
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default new StudentsService();
