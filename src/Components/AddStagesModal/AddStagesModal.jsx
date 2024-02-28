import React, { useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useDispatch } from 'react-redux';
import { CreateStages, UpdateStage, getOneStage, getStages, showAddStagesModal } from '../../Redux/Slice/stageSlice';
import './AddStagesModal.css'
import { useSelector } from 'react-redux';

const AddStagesModal = ({ id,projectId }) => {
    console.log(id);
    const dispatch = useDispatch();
    const { stage } = useSelector((state) => state.stage)
    useEffect(() => {
        if (id) {
            dispatch(getOneStage(id));
        }
    }, [dispatch, id]);

    const handleClose = () => {
       
        dispatch(showAddStagesModal(false));
    }
    const initialValues = id ? { stages: stage.stage } : { stages: [""] }; console.log(stage.stage);
    return (
        <>
            <div className='stage-create-modal'>
                <div>
                    {id ? <h1>Edit Stage</h1> : <h1>Add Stages</h1>}
                    <span className="close-button" onClick={handleClose}>&times;</span>
                </div>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                        console.log(values)
                        if (id) {
                            await dispatch(UpdateStage({ id, values }))
                        } else {
                            await dispatch(CreateStages({id:projectId,values}))

                        }
                        await dispatch(getStages({id:projectId}));
                        dispatch(showAddStagesModal(false));
                    }}
                    render={({ values }) => (
                        <Form>
                            {!id ? (
                                <FieldArray
                                    name="stages"
                                    render={arrayHelpers => (
                                        <div>
                                            {values.stages.map((stage, index) => (
                                                <div key={index}>
                                                    <Field name={`stages.${index}`} placeholder="Enter the stage" />
                                                    <button
                                                        className='buttons-add-and-remove'
                                                        type="button"
                                                        onClick={() => arrayHelpers.remove(index)}
                                                    >
                                                        -
                                                    </button>
                                                    <button
                                                        className='buttons-add-and-remove'
                                                        type="button"
                                                        onClick={() => arrayHelpers.insert(index, '')}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            ))}
                                            <button className='buttons' type="button" onClick={() => arrayHelpers.push('')}>
                                                Add new stage
                                            </button>
                                            <div>
                                                <button className='buttons submit' type="submit">Submit</button>
                                            </div>
                                        </div>
                                    )}
                                />
                            ) : (
                                <>
                                    <Field
                                        name="stages"
                                        placeholder="enter the stage"

                                    />
                                    <div>
                                        <button className='buttons submit' type="submit">Submit</button>
                                    </div>
                                </>
                            )}
                        </Form>
                    )}
                />

            </div>
            <div className='overlay'></div>
        </>
    );
}

export default AddStagesModal;
