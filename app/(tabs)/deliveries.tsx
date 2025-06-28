import React from 'react';
import RoleGuard from '@/components/RoleGuard';
import DeliveriesContent from '@/components/DeliveriesContent';

export default function DeliveriesScreen() {
  return (
    <RoleGuard requiredRole="delivery_driver">
      <DeliveriesContent />
    </RoleGuard>
  );
}