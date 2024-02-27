import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useDispatch } from 'react-redux';
import { CreateStages, getStages } from '../../Redux/Slice/stageSlice';
import './AddStagesModal.css'
const AddStagesModal = () => {
    const dispatch = useDispatch()

    return (
        <>
        <div className='stage-create-modal'> 
            <h1>Add Stages</h1>
            <Formik
                initialValues={{ stages: [""] }}
                onSubmit={async (values) => {
                    await dispatch(CreateStages(values))
                    dispatch(getStages())
                }

                }
                render={({ values }) => (
                    <Form>
                        <FieldArray
                            name="stages"
                            render={arrayHelpers => (
                                <div>
                                    {values.stages && values.stages.length > 0 ? (
                                        values.stages.map((stage, index) => (
                                            <div key={index}>
                                                <Field name={`stages.${index}`} />
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                >
                                                    -
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <button type="button" onClick={() => arrayHelpers.push('')}>
                                            {/* show this when user has removed all friends from the list */}
                                            Add a friend
                                        </button>
                                    )}
                                    <div>
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                            )}
                        />
                    </Form>
                )}
            />
        </div>
            <div className='overlay'></div>
            </>
    )
}
export default AddStagesModal 