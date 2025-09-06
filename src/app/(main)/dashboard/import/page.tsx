import FileUploadWizard from "@/components/file-upload-wizard";

export default function ImportPage() {
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-xl font-semibold">Data Import</h1>
      <FileUploadWizard />
    </div>
  );
}
