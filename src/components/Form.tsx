
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver }  from '@hookform/resolvers/zod'

const schema = z.object({
    name: z.string().min(3, { message: 'Name should be at least 3 characters long.'}),
    age: z.number({invalid_type_error: 'Age is required.'})
          .min(18, { message: 'Age should be at least 18.'}),
    email: z.string()
            .email({ message: 'Invalid email address.' }),
    password: z.string({required_error: 'Password is required'})
               .min(7, { message: "Password should be at least 7 characters long." })
               .max(14, {message: 'Password length should not exceed 14 characters'}),
    confirm: z.string(),
    phone: z.number({invalid_type_error: 'Phone is required.'})
            .int({message: 'Mobile Phone number should not contain any commas.'})
            .gte(6900000000, {message: 'The Mobile Phone number should start from 69 and be 10 characters long.'})
            .lte(6999999999, {message: 'The Mobile Phone number should start from 69 and its length should not exceed 10 characters.'}),
})

.refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match, please check the fields again.', path: ['confirm'] });

type FormData = z.infer<typeof schema>


const Form = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
        } = useForm <FormData> ({
            resolver: zodResolver(schema) });

    const onSubmit = ( data:FieldValues ) => {
        console.log(data);
        reset();
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-text mb-3 text-danger">
                All fields are required*
            </div>
    
            <div className="mb-3">
                <input { ...register('name') } id="name" type="text" className="form-control" placeholder="Name" />
                { errors.name && <p className='text-danger'>{errors.name.message}</p> }
            </div>
    
            <div className="mb-3">
                <input { ...register('age', {valueAsNumber: true} ) } id="age" type="number" className="form-control" placeholder="Age" />
                { errors.age && <p className='text-danger'>{errors.age.message}</p> }
            </div>

            <div className="mb-3">
                <input { ...register('phone', {valueAsNumber: true}) } id="phone" type="number" className="form-control" placeholder="Mobile Phone" />
                { errors.phone && <p className='text-danger'>{errors.phone.message}</p> }
            </div>
    
            <div className="mb-3">
                <input { ...register('email') } id="email" type="text" className="form-control" placeholder="Email" />
                { errors.email && <p className='text-danger'>{errors.email.message}</p> }
            </div>
    
            <div className="mb-3">
                <input {...register('password')} id="password" type="password" className="form-control" placeholder="Password" />
                { errors.password && <p className='text-danger'>{errors.password.message}</p> }
                <div className="form-text">
                    Your password must be 7-14 characters long.
                </div>
            </div>
    
            <div className="mb-3">
                <input {...register('confirm')} id="confirm" type="password"  className="form-control" placeholder="Confirm Password" />
                { errors.confirm && <p className='text-danger'>{errors.confirm.message}</p> }
            </div>
    
            <button
                type="submit"
                className='btn btn-outline-primary rounded-0'>Submit
            </button>
    
        </form>
        )
}

export default Form