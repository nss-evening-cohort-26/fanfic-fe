import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';

function RegisterForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    image: user.fbUser.photoURL,
    createdOn: new Date(),
    staff: false,
    uid: user.uid,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(router.push('/dashboard'));
  };

  return (
    <div className="mt-16 flex justify-center">
      <Form onSubmit={handleSubmit} className="w-96">
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" name="firstName" value={formData.firstName} onChange={handleChange} className="input rounded-none" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" name="lastName" value={formData.lastName} onChange={handleChange} className="input rounded-none" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} className="input rounded-none" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control type="text" as="textarea" placeholder="Enter bio" name="bio" value={formData.bio} onChange={handleChange} className="input rounded-none" required />
        </Form.Group>
        <Button type="submit" className="bg-slate-800 border-none hover:bg-slate-800 text-white font-semibold rounded-sm mt-2">
          {user.id ? 'Update' : 'Register'}
        </Button>
      </Form>
    </div>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    createdOn: PropTypes.string,
    staff: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
};

export default RegisterForm;
