import { PaymentService } from './paiement.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<any>;
    getPaymentsByUser(userId: number): Promise<import("./models/paiement.model").Paiements[]>;
    getPaymentById(paymentId: string): Promise<import("./models/paiement.model").Paiements>;
    updatePaymentStatus(paymentId: string, status: string): Promise<import("./models/paiement.model").Paiements>;
    updatePayment(paymentId: string, updatePaymentDto: UpdatePaymentDto): Promise<import("./models/paiement.model").Paiements>;
}
