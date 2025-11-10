'use client';

import { Bell, Package, Truck, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'order' | 'shipping' | 'delivery';
  title: string;
  message: string;
  time: string;
  read: boolean;
  orderId?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'shipping',
    title: 'Order in Transit',
    message: 'Your order #ORD-002 has been shipped and is on its way',
    time: '2 hours ago',
    read: false,
    orderId: 'ORD-002',
  },
  {
    id: '2',
    type: 'delivery',
    title: 'Order Delivered',
    message: 'Your order #ORD-001 has been successfully delivered',
    time: '1 day ago',
    read: false,
    orderId: 'ORD-001',
  },
  {
    id: '3',
    type: 'order',
    title: 'Order Confirmed',
    message: 'We have received your order #ORD-003. We will process it soon',
    time: '2 days ago',
    read: true,
    orderId: 'ORD-003',
  },
];

export default function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4 text-neutral-700" />;
      case 'shipping':
        return <Truck className="w-4 h-4 text-neutral-700" />;
      case 'delivery':
        return <CheckCircle className="w-4 h-4 text-neutral-900" />;
    }
  };

  return (
    <div className="relative">
      {/* Bell Button - Premium Dark */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-white/10 rounded-sm transition-all duration-300"
      >
        <Bell className="w-5 h-5 text-neutral-300 hover:text-white transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-white text-neutral-900 text-[10px] font-normal rounded-sm flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop - MÁS OSCURO Y MÁS BLUR */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-lg z-[9998] transition-all duration-500"
            onClick={() => setIsOpen(false)}
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh'
            }}
          />

          {/* Panel - Justo debajo del botón */}
          <div className="absolute right-0 top-full mt-3 w-96 bg-white rounded-sm shadow-2xl border border-neutral-200 z-[9999] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div>
                <h3 className="font-light text-neutral-900 uppercase tracking-wider text-sm">
                  Notifications
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1 uppercase tracking-widest">
                  {unreadCount > 0
                    ? `${unreadCount} Unread`
                    : 'All Clear'}
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-neutral-700 hover:text-neutral-900 font-normal uppercase tracking-wider transition-colors"
                >
                  Mark All
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[420px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-16 text-center">
                  <Bell className="w-10 h-10 text-neutral-300 mx-auto mb-6" />
                  <p className="text-neutral-500 font-light text-sm uppercase tracking-wide">
                    No notifications
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-6 hover:bg-neutral-50 transition-all duration-300 cursor-pointer ${
                        !notification.read ? 'bg-neutral-50' : ''
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-neutral-100 flex items-center justify-center">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-normal text-neutral-900 text-sm uppercase tracking-wide">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-sm text-neutral-600 mb-2 font-light leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-xs text-neutral-400 font-light uppercase tracking-widest">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-neutral-200 bg-neutral-50">
                <button className="w-full text-center text-xs text-neutral-700 hover:text-neutral-900 font-normal py-2 uppercase tracking-widest transition-colors">
                  View All
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
