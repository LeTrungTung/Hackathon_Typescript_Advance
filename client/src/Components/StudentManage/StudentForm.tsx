import React, { ChangeEvent, FormEvent } from "react";

interface StudentFormProps {
  active: boolean;
  actionUrl: string;
  submitTitle: string;
}

interface StudentFormState {
  name: string;
  age: string;
  class: string;
  avatar?: string;
}

class StudentForm extends React.Component<
  StudentFormProps,
  StudentFormState
> {
  constructor(props: StudentFormProps) {
    super(props);

    this.state = {
      name: "",
      age: "",
      class: "",
      avatar: "",
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    } as Pick<StudentFormState, keyof StudentFormState>);
  };

  handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          avatar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add code to handle form submission here
  };

  render() {
    const { active, actionUrl, submitTitle } = this.props;
    const { name, age, class: studentClass, avatar } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        encType="multipart/form-data"
        method="post"
        action={actionUrl}
      >
        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={name}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Student Age</label>
          <input
            name="age"
            type="text"
            className="form-control"
            value={age}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Student Avatar</label>
          <input
            name="avatar"
            type="file"
            className="form-control"
            onChange={this.handleFileChange}
          />
          {avatar && (
            <img
              id="avatar_preview"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginTop: "10px",
              }}
              src={avatar}
              alt="Avatar Preview"
            />
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Student Class</label>
          <input
            name="class"
            type="text"
            className="form-control"
            value={studentClass}
            onChange={this.handleChange}
          />
        </div>
        {active && (
          <input type="text" hidden className="form-control" />
        )}
        <button type="submit" className="btn btn-primary">
          {submitTitle}
        </button>
      </form>
    );
  }
}

export default StudentForm;
