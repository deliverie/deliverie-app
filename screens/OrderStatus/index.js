/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';

import success from '../../assets/images/success.png';
import time from '../../assets/images/time.png';
import motorcycle from '../../assets/images/motorcycle.png';
import fail from '../../assets/images/fail.png';
import done from '../../assets/images/done.png';

const OrderStatus = ({ route: { params } }) => {
  const renderImage = () => {
    if (!params?.order_status) {
      return time;
    }
    const { order_status } = params;
    if (order_status === 'pending') {
      return time;
    }
    if (order_status === 'accepted') {
      return success;
    }
    if (order_status === 'on_way') {
      return motorcycle;
    }
    if (order_status === 'done') {
      return done;
    }
    if (order_status === 'cancelled') {
      return fail;
    }
    return time;
  };

  const renderText = () => {
    if (!params?.order_status) {
      return null;
    }
    const { order_status } = params;
    if (order_status === 'pending') {
      return (
        <View>
          <Text style={{ fontFamily: 'roboto', fontSize: 18 }}>
            Pedido pendente
          </Text>
          <Text style={{ fontFamily: 'roboto-light', fontSize: 16 }}>
            Aguarde até que o estabelecimento aceite seu pedido.
          </Text>
        </View>
      );
    }
    if (order_status === 'accepted') {
      return (
        <View>
          <Text style={{ fontFamily: 'roboto', fontSize: 18 }}>
            Pedido aceito!
          </Text>
          <Text style={{ fontFamily: 'roboto-light', fontSize: 16 }}>
            Seu pedido foi aceito com sucesso, aguarde até ele ser
            entregue até você. :)
          </Text>
        </View>
      );
    }
    if (order_status === 'on_way') {
      return (
        <View>
          <Text style={{ fontFamily: 'roboto', fontSize: 18 }}>
            Pedido à caminho
          </Text>
          <Text style={{ fontFamily: 'roboto-light', fontSize: 16 }}>
            Seu pedido saiu para entrega.
          </Text>
        </View>
      );
    }
    if (order_status === 'done') {
      return (
        <View>
          <Text style={{ fontFamily: 'roboto', fontSize: 18 }}>
            Pedido concluído
          </Text>
          <Text style={{ fontFamily: 'roboto-light', fontSize: 16 }}>
            A empresa confirmou a entrega do seu pedido, em instantes
            você poderá avalia-lo. Caso algo tenha dado errado você
            pode contactar a empresa e caso não obtenha resposta, o
            nosso suporte :)
          </Text>
        </View>
      );
    }
    if (order_status === 'cancelled') {
      return (
        <View>
          <Text style={{ fontFamily: 'roboto', fontSize: 18 }}>
            Pedido cancelado
          </Text>
          <Text style={{ fontFamily: 'roboto-light', fontSize: 16 }}>
            Seu pedido foi cancelado pelo estabelecimento!
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontFamily: 'roboto', fontSize: 18 }}>
        #{params?.id}
      </Text>
      <View style={{ marginBottom: 15, marginTop: 5 }}>
        <Image source={renderImage()} />
      </View>
      {renderText()}
    </View>
  );
};

export default OrderStatus;
