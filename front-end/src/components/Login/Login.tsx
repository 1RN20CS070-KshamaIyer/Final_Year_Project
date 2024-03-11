import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { Button, Card, Field, Image, Input, mergeClasses } from '@fluentui/react-components';
import { useStyles } from './Login.styles';
import { useAuth } from '../../hooks/AuthProvider';

interface User {
    username: string;
    email: string;
    pwd: string;
    learnstyle?: string;
}

const Login = () => {

    const [list, setList] = useState<Array<User>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [err, setErr] = useState<string>('')
    const styles = useStyles();
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>()

    useEffect(() => {
        fetch('http://127.0.0.1:8000/students/')
            .then(response => response.json())
            .then(data => {
                setList(data.students);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {(error as Error).message}</p>;

    const onSubmit = (data: User) => {
        const validate = list?.find(
            (item) => item.username === data.username && item.email === data.email && item.pwd === data.pwd
        );
        if (!validate) {
            setErr('error')
        }
        else {
            auth.loginAction(validate);

            return;
        }
    }

    return (
        <div className={styles.root}>
            <div className={styles.body}>
                <div className={styles.header}>
                    <h2 className={styles.h2}>Welcome!</h2>
                    <p className={styles.p}>Log in to get started</p>
                </div>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <Field
                            label="Username"
                            validationState={errors.username && "error"}
                            validationMessage={errors.username?.message as string}
                            required
                        >
                            <Input
                                {...register('username',
                                    {
                                        required: { value: true, message: "Please enter username" },
                                    })}
                            />
                        </Field>
                        <Field
                            label="Email"
                            validationState={errors.email && "error"}
                            validationMessage={errors.email?.message as string}
                            required
                        >
                            <Input
                                type='email'
                                {...register('email',
                                    {
                                        required: { value: true, message: "Please enter email" },
                                    })}
                            />
                        </Field>
                        <Field
                            label="Password"
                            validationState={errors.pwd && "error"}
                            validationMessage={errors.pwd?.message as string}
                            required
                        >
                            <Input
                                type='password'
                                {...register('pwd',
                                    {
                                        required: { value: true, message: "Please enter password" },
                                    })}
                            />
                        </Field>
                        <Button className={styles.button} type="submit">Log in</Button>
                        {err === 'error' && <Card className={mergeClasses(styles.card, styles.error)} appearance='filled-alternative' ><p>Invalid Credentials</p></Card>}
                    </form>
                </div>
            </div>
            <div>
                <Image
                    alt="signup image"
                    src="https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                    height={600}
                    width={700}
                />
            </div>
        </div>
    )
}

export default Login