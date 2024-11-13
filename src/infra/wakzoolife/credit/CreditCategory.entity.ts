/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CreditParticipantEntity } from './CreditParticipant.entity';

@Entity({ name: 'CreditCategory' })
export class CreditCategoryEntity {

  @PrimaryColumn({ type: 'varchar', length: 10 })
  code: string;

  @Column({ type: 'varchar', length: 50 })
  categoryName: string;

  @OneToMany(() => CreditParticipantEntity, (participant) => participant.category, {
    cascade: true,
  })
  participants: CreditParticipantEntity[];

}