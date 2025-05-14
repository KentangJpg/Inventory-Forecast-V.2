import React from 'react'
import PageLayout from '../layouts/PageLayout'
import { useOutletContext } from 'react-router-dom'
import { useState } from 'react'

const PurchaseOrder = () => {
    const { toggleSidebar, isMobile } = useOutletContext()
  return (
    <PageLayout
      title="Purchase Order"
      toggleSidebar={toggleSidebar}
      isMobile={isMobile}
    >
      <div className="mt-4">
        asd
      </div>
    </PageLayout>  )
}

export default PurchaseOrder