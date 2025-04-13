import { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';

function MannKiBaatCard() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [journalEntry, setJournalEntry] = useState<string>('');

  const toast = useRef<Toast>(null);

  const onUpload = () => {
    toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  };
  const setup = [
    {
      id: 1,
      question:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore minima excepturi dolorem dignissimos voluptate expedita natus ut, odit maxime?'
    },
    {
      id: 2,
      question:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore minima excepturi dolorem dignissimos voluptate expedita natus ut, odit maxime?'
    }
  ];

  const handleSave = () => {
    setOpenModal(false);
    setJournalEntry('');
  };

  const footerContent = (
    <div className="flex items-center gap-2">
      <Toast ref={toast}></Toast>
      <FileUpload
        mode="basic"
        name="demo[]"
        url="/api/upload"
        accept="image/*"
        maxFileSize={1000000}
        onUpload={onUpload}
        auto
        chooseLabel=" Add file"
        className="rounded-md bg-accent text-text cursor-pointer px-4 py-2"
      />
      <Button
        label="Save entry"
        icon="pi pi-check"
        className="rounded-md bg-accessible-green text-text cursor-pointer px-4 py-2"
        onClick={() => handleSave()}
        autoFocus
      />
    </div>
  );

  return (
    <div className="h-full rounded-lg w-full bg-primary-hover flex flex-col">
      <p className="font-medium text-lg border-b-1 border-accessible-green p-2 rounded-t-lg uppercase">
        mann ki baat
      </p>
      <div className="flex flex-grow justify-between w-full h-full items-start">
        <div className="flex flex-col gap-1 w-[90%] h-full">
          <div className="overflow-y-hidden">
            {setup.map((item: any) => {
              return (
                <div className="border-1 border-dashed border-text-contrast p-4 m-4 rounded-md bg-card-content">
                  <p className="text-text-contrast">{item.question}</p>
                </div>
              );
            })}
          </div>
          <div className="chatbox w-full p-4 rounded-bl-lg hover:bg-accessible-green bg-card-content text-text text-center font-medium text-lg hover:text-xl">
            Tell me about your day. Click here to type
          </div>
        </div>
        <div
          onClick={() => setOpenModal(true)}
          className="chatWrapper flex border-l border-l-accessible-green hover:bg-accessible-green text-text w-1/10 justify-center h-full items-center rounded-br-lg text-lg font-bold text-center">
          <div className="w-full p-2">Add to Journal</div>
        </div>
      </div>
      <div className="card flex justify-content-center">
        {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
        <Dialog
          header={<div className="font-bold">JOURNAL</div>}
          visible={openModal}
          style={{ width: '50vw' }}
          className="bg-primary-hover text-text p-8 rounded-lg"
          maximizable
          footer={footerContent}
          onHide={() => {
            if (!openModal) return;
            setOpenModal(false);
          }}>
          <div className="card flex justify-content-center p-4">
            <InputTextarea
              id="description"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              rows={28}
              cols={95}
              className="rounded-md border-1 p-4 w-full h-full"
              placeholder="Welcome to your journal. Tell me how was your day?"
            />
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default MannKiBaatCard;
