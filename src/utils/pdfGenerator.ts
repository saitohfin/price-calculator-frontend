import jsPDF from 'jspdf';
import { CartItem } from '../types';
import { calculateDiscountsForSecondItem, calculateDiscountsForPairItems, calculateTotal } from './priceCalculator';
import { sortCartItemsForView, sortCartItemsByDiscount } from './sorting';

const TYPE_DISCOUNT: String = "SECOND_ITEM_DISCOUNT";

export class PDFGenerator {
  static generatePDF(name: string, cartItems: CartItem[]): void {
    const doc = new jsPDF();
    const date = new Date();
    const formattedDate = date.toLocaleDateString().replace(/\//g, '-');
    const formattedTime = date.toLocaleTimeString();

    doc.text(`Nombre: ${name}`, 10, 10);
    doc.text(`Fecha: ${formattedDate}`, 10, 20);
    doc.text(`Hora: ${formattedTime}`, 10, 30);
    doc.text('Carrito:', 10, 40);

    let sortedAndDiscounted: CartItem[];
    if (TYPE_DISCOUNT === "SECOND_ITEM_DISCOUNT") {
      sortedAndDiscounted = calculateDiscountsForSecondItem(sortCartItemsForView(cartItems));
    } else {
      sortedAndDiscounted = calculateDiscountsForPairItems(sortCartItemsByDiscount(cartItems));
    }

    const sortedItems = sortCartItemsForView(cartItems);
    const total = calculateTotal(sortedItems);

    sortedAndDiscounted.forEach((item, index) => {
      let itemText = `${item.price.toFixed(2)}€ - ${item.name}`;
      if (item.appliedDiscount > 0) {
        itemText += ` - (-%${item.discount}) - ${item.appliedDiscount.toFixed(2)}€`;
      }
      doc.text(itemText, 20, 50 + (index * 10));
    });

    doc.text(`Total: ${total.toFixed(2)}€`, 10, 50 + (sortedAndDiscounted.length * 10) + 10);

    const filename = `${formattedDate}_${name}.pdf`;
    doc.save(filename);
  }
}