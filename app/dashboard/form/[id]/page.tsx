import React from 'react';
import EditForm from '@/components/forms/EditForm';

interface Props {
    params: {
        id: string;
    };
}

const FormDetailPage = ({ params }: Props) => {
    return (
        <div className="p-6">
            <EditForm prelistingId={params.id} />
        </div>
    );
};

export default FormDetailPage;
