import React from 'react';
import RoleGuard from '@/components/RoleGuard';
import SellContent from '@/components/SellContent';

export default function SellScreen() {
  return (
    <RoleGuard requiredRole="seller">
      <SellContent />
    </RoleGuard>
  );
}