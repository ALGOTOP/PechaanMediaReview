import AuditHeader from '../AuditHeader';

export default function AuditHeaderExample() {
  return (
    <AuditHeader 
      overallScore={42}
      onExport={() => console.log('Export triggered')}
    />
  );
}
