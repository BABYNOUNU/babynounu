import { Repository } from 'typeorm';
import { Paiements } from './models/paiement.model';
import { CreatePaymentDto } from './dtos/create-payment.dto';
export declare class PaymentService {
    private readonly paymentRepository;
    constructor(paymentRepository: Repository<Paiements>);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<any>;
    getPaymentsByUser(userId: number): Promise<Paiements[]>;
    getPaymentById(paymentId: string): Promise<Paiements>;
    updatePaymentStatus(paymentId: string, status: string): Promise<Paiements>;
}
