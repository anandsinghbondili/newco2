import DealDetailsClient from '@/app/(packages)/deals/[deal_number]/DealDetailsClient';

export default async function DealDetailsPage({ params }: { params: Promise<{ deal_number: string }> }) {
    const { deal_number } = await params;
    return <DealDetailsClient deal_number={deal_number} />;
}